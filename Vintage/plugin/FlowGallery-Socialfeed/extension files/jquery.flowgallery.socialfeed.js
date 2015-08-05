/*! Social Feed - Extension for Flow Gallery jQuery plugin - 1.0.1
 * Copyright 2015, Nilok Bose
 * http://codecanyon.net/user/cosmocoder
*/

// polyfill for bind()
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}



// Object.create support test, and fallback for browsers without it
if ( typeof Object.create !== 'function' ) {
    Object.create = function(o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}



(function($, document, window) {
    'use strict';

    var FlowSocialFeed = {
        init: function(options, elem) {
            this.$elem = $(elem);
            this.options = options;

            var self = this, configReq;

            if( this.options.feed === 'facebook' ) {
                configReq = this.loadFacebookData();
            }
            else if( this.options.feed === 'instagram' ){
                configReq = this.loadInstagramData();
            }
            else if( this.options.feed === 'dribbble' ){
                configReq = this.loadDribbbleData();
            }
            else if( this.options.feed === 'pinterest' ){
                configReq = this.loadPinterestData();
            }


            configReq.done(function(data) {
                var flowOptions = self.options;
                flowOptions.configData = data;
                flowOptions.configUrl = '';
                flowOptions.enableCache = false;

                if( self.options.feed === 'dribbble' || self.options.feed === 'pinterest' ) {
                    flowOptions.showFilterMenu = false;
                }

                self.$elem.flowGallery( flowOptions ).addClass( self.options.feed);
                self.$elem.find('div.flow-menu').find('a[data-type="audio"]').hide();

                // insert user avatars
                if( self.options.feed === 'dribbble' && self.options.dribbbleOptions.sourceType !== 'user' && self.options.dribbbleOptions.showAvatar ) {
                    var infoContainer = self.options.items.style === 'tile' ? 'div.card-image' : 'div.card-action';

                    // randomize gallery items
                    if( self.options.shuffleItems ) {
                        data = self.shuffle( data );
                    }

                    self.$elem.on('onSetup', function() {
                        self.$elem.find('div.item').each(function(i) {
                            $(this).find(infoContainer).append('<a class="user" href="' + data[i].user.url +'" title="' + data[i].user.name +'" target="_blank"><img src="' + data[i].user.avatar + '"/></a>');
                        });
                    });
                }
            });
        },



        // get the cached playlist data
        getCache: function(cacheId) {
            var req = $.ajax({
                type: 'post',
                data: {interval: this.options.cacheInterval, cacheFile: cacheId+'-cache.json'},
                url: this.options.cacheFolder+'/get-cache.php',
                dataType: 'json',
                global: false
            });

            return req;
        },



        // update the cache file with the fresh playlist data
        updateCache: function(json, cacheId) {
            $.ajax({
                type: 'post',
                data: {config: JSON.stringify(json), cacheFile: cacheId+'-cache.json'},
                url: this.options.cacheFolder+'/update-cache.php',
                dataType: 'json',
                global: false
            });
        },



        // function to load data from facebook
        loadFacebookData: function() {
            var self = this,
                options = self.options.facebookOptions,
                albumnum = options.numberOfAlbums,
                cacheId = '',
                cacheReq,
                facebookUrl = 'https://graph.facebook.com/',
                configReq = $.Deferred();

            if( options.sourceType === 'photos' ) {
                facebookUrl += options.userID + '/photos/uploaded/?fields=name,description,created_time,images,likes.summary(true)&limit=' + options.limit;
                cacheId = 'facebook-' + options.userID + '-photos';
            }
            else if( options.sourceType === 'videos' ) {
                facebookUrl += options.userID + '/videos/uploaded/?fields=name,description,created_time,format,source,likes.summary(true)&limit=' + options.limit;
                cacheId = 'facebook-' + options.userID + '-videos';
            }
            else if( options.sourceType === 'album' ) {
                facebookUrl += options.albumID + '/photos/?fields=name,description,created_time,images,likes.summary(true)&limit=' + options.limit;
                cacheId = 'facebook-album-' + options.albumID;
            }
            else if( options.sourceType === 'albums' ) {
                facebookUrl += options.userID + '/albums/?fields=name,cover_photo,count&limit=' + options.numberOfAlbums;
                cacheId = 'facebook-' + options.userID + '-albums';
            }

            facebookUrl += '&access_token=' + options.accessToken;


            // check the cache first
            if( self.options.enableCache ) {
                cacheReq = self.getCache(cacheId);
            }
            else {
                cacheReq = $.Deferred();
                cacheReq.resolve({expired: true});
            }

            cacheReq.done(function(cache){
                if( !cache.expired ) {
                    configReq.resolve(cache);  // initialize the gallery from cached data
                }
                else {  // cache expired, load fresh data
                    $.ajax({
                        url: facebookUrl,
                        dataType: 'json',
                        success: function(data) {
                            var config = [], getAlbums = [];

                            if( !data.error ) {
                                if( options.sourceType === 'albums' ) {
                                    config = {albums: []};

                                    $.each(data.data, function(index) {
                                        config.albums[index] = {};
                                        config.albums[index].title = this.name;

                                        var request = $.ajax({
                                            url: 'https://graph.facebook.com/'+this.id+'/photos/?fields=name,description,created_time,images,likes.summary(true)&limit='+options.limit,
                                            dataType: 'json',
                                            success: function(albumData) {
                                                config.albums[index].items = self.createFacebookSetData(albumData.data, 'photo');
                                            }
                                        });

                                        getAlbums.push(request);

                                        if( index === albumnum - 1 ) {
                                            return false;
                                        }
                                    });
                                }

                                else if( options.sourceType === 'videos' ) {
                                    config = self.createFacebookSetData(data.data, 'video');
                                }

                                else {
                                    config = self.createFacebookSetData(data.data, 'photo');
                                }

                                $.when.apply($, getAlbums).done(function() {
                                    self.options.enableCache && self.updateCache(config, cacheId);  // update the cache file with the loaded data
                                    configReq.resolve(config);
                                });
                            }

                            else if( data.error) {
                                self.fgLog( 'facebook: '+ data.error.message );
                            }

                            else if( data.data.length === 0 ) {
                                self.fgLog( 'facebook: No photos/videos found' );
                            }
                        }
                    });
                }
            });

            return configReq;
        },




        // generate json from facebook api containing data for a particular album or list of photos/videos
        createFacebookSetData: function(data, type) {
            var self = this, config = [];

            if( data.length === 0 ) {
                self.fgLog('No items found');
                return;
            }

            $.each(data, function(i, item) {
                var obj = {},
                    numLikes = item.likes ? item.likes.summary.total_count : 0;

                if( type === 'photo' ) {
                    obj.type = 'photo';
                    obj.sort = {date: new Date().setTime( Date.parse(item.created_time) ), likes: numLikes};
                    obj.thumbnail = item.images[3] ? item.images[3].source : item.images[item.images.length - 1].source;
                    obj.source = item.images[0].source;
                    obj.title = '';
                    obj.description = item.name ? item.name : '&nbsp;';
                }
                else {
                    obj.type = 'video';
                    obj.sort = {date: new Date().setTime( Date.parse(item.created_time) ), likes: numLikes};
                    obj.thumbnail = item.format[1].picture;
                    obj.mp4 = item.source;

                    if( item.name ) {
                        obj.title = item.name;
                        obj.description = item.description ? item.description : '&nbsp;';
                    }
                    else {
                        obj.title = '';
                        obj.description = item.description ? item.description : '&nbsp;';
                    }
                }

                obj.title += '<span class="meta"><span class="uploaded">'+self.formatDate(item.created_time)+'</span><span class="likes"><i class="mdi-action-thumb-up"></i> '+self.formatNumber(numLikes)+'</span></span>';

                config.push(obj);
            });

            return config;
        },



         // load data from Instagram
        loadInstagramData: function() {
            var self = this,
                options = self.options.instagramOptions,
                thumbSize = '',
                cacheId = '',
                instagramUrl = 'https://api.instagram.com/v1/',
                configReq = $.Deferred(),
                cacheReq;

            if( options.sourceType === 'user' ) {
                instagramUrl += 'users/' + options.userID + '/media/recent/?access_token=' + options.accessToken + '&count=' + options.limit + '&callback=?';
                cacheId = 'instagram-user-' + options.userID;
            }
            else if( options.sourceType === 'popular' ) {
                instagramUrl += 'media/popular?access_token=' + options.accessToken + '&count=' + options.limit + '&callback=?';
                cacheId = 'instagram-popular';
            }
            else if( options.sourceType === 'tag' ) {
                instagramUrl += 'tags/'+ options.tag + '/media/recent/' + '?access_token=' + options.accessToken + '&count=' + options.limit + '&callback=?';
                cacheId = 'instagram-tag-' + options.tag;
            }

            // check the cache first
            if( self.options.enableCache ) {
                cacheReq = self.getCache(cacheId);
            }
            else {
                cacheReq = $.Deferred();
                cacheReq.resolve({expired: true});
            }

            cacheReq.done(function(cache) {
                if( !cache.expired ) {
                    configReq.resolve(cache);  // initialize the gallery from cached data
                }
                else {  // cache expired, load fresh data
                    $.ajax({
                        url: instagramUrl,
                        dataType: 'jsonp',
                        timeout: 5000,
                        success: function(data) {
                            if( !data.data ) {
                                self.fgLog('Instagram request failed');
                                return;
                            }

                            var config = [];

                            $.each(data.data, function(i) {
                                config[i] = {};

                                if( this.type === 'image' ) {
                                    config[i].type = 'photo';
                                    config[i].source = this.images.standard_resolution.url;
                                }
                                else if( this.type === 'video' ) {
                                    config[i].type = 'video';
                                    config[i].mp4 = this.videos.standard_resolution.url;
                                }

                                config[i].sort = {date: parseInt(this.created_time, 10), likes: this.likes.count};
                                config[i].thumbnail = this.images[options.thumbSize].url;
                                config[i].title = '<span class="meta">';
                                config[i].title += '<span class="uploaded">'+ self.formatDate(parseInt(this.created_time, 10) * 1000) +'</span>';
                                config[i].title += '<span class="likes"><i class="mdi-action-favorite"></i> '+self.formatNumber(this.likes.count)+'</span>';
                                config[i].title += '</span>';
                                config[i].description = this.caption ? this.caption.text : '&nbsp;';
                            });

                            self.options.enableCache && self.updateCache(config, cacheId);  // update the cache file with the loaded data
                            configReq.resolve(config);
                        }
                    });
                }
            });

            return configReq;
        },



        // load data from Dribbble
        loadDribbbleData: function() {
            var self = this,
                options = self.options.dribbbleOptions,
                cacheId = '',
                dribbbleUrl = 'https://api.dribbble.com/v1/',
                configReq = $.Deferred(),
                cacheReq;

            if( options.sourceType === 'user' ) {
                dribbbleUrl += 'users/' + options.userID + '/shots/?access_token=' + options.accessToken + '&per_page=' + options.limit + '&callback=?';
                cacheId = 'dribbble-user-' + options.userID;
            }
            else if( options.sourceType === 'list' ) {
                dribbbleUrl += 'shots/?access_token=' + options.accessToken + '&list=' + options.listName + '&per_page=' + options.limit + '&callback=?';
                cacheId = 'dribbble-list-' + options.listName;
            }
            else if( options.sourceType === 'bucket' ) {
                dribbbleUrl += 'buckets/'+ options.bucketID + '/shots/?access_token=' + options.accessToken + '&per_page=' + options.limit + '&callback=?';
                cacheId = 'dribbble-bucket-' + options.bucketID;
            }
            else if( options.sourceType === 'project' ) {
                dribbbleUrl += 'projects/'+ options.projectID + '/shots/?access_token=' + options.accessToken + '&per_page=' + options.limit + '&callback=?';
                cacheId = 'dribbble-project-' + options.projectID;
            }


            // check the cache first
            if( self.options.enableCache ) {
                cacheReq = self.getCache(cacheId);
            }
            else {
                cacheReq = $.Deferred();
                cacheReq.resolve({expired: true});
            }

            cacheReq.done(function(cache) {
                if( !cache.expired ) {
                    configReq.resolve(cache);  // initialize the gallery from cached data
                }
                else {  // cache expired, load fresh data
                    $.ajax({
                        url: dribbbleUrl,
                        dataType: 'jsonp',
                        timeout: 5000,
                        success: function(data) {
                            if( !data.data ) {
                                self.fgLog('Dribbble request failed');
                                return;
                            }

                            var config = [];

                            $.each(data.data, function(i) {
                                config[i] = {};

                                config[i].type = 'photo';
                                config[i].sort = {date: new Date().setTime( Date.parse(this.created_at) ), likes: this.likes_count, views: this.views_count};

                                if( options.sourceType !== 'user' ) {
                                    config[i].user = {avatar: this.user.avatar_url, name: this.user.name, url: this.user.html_url};
                                }

                                config[i].source = this.images.hidpi;
                                config[i].thumbnail = this.images.normal;
                                config[i].title = this.title + '<span class="meta"><span class="views"><i class="mdi-action-visibility"></i> '+ self.formatNumber(this.views_count) + '</span><span class="likes"><i class="mdi-action-favorite"></i> '+self.formatNumber(this.likes_count)+'</span></span>';
                                config[i].description = this.description ? this.description.replace(/(<p>)/g, '').replace(/(<\/p>)/g, '<br><br>') : '&nbsp;';
                                config[i].description += '<span class="uploaded">'+self.formatDate(this.created_at)+'</span>';
                            });

                            self.options.enableCache && self.updateCache(config, cacheId);  // update the cache file with the loaded data
                            configReq.resolve(config);
                        }
                    });
                }
            });

            return configReq;
        },



        // load data from Pinterest
        loadPinterestData: function() {
            var self = this,
                options = self.options.pinterestOptions,
                cacheId = '',
                pinterestUrl = 'https://api.pinterest.com/v3/pidgets/',
                configReq = $.Deferred(),
                cacheReq;

            if( options.sourceType === 'user' ) {
                pinterestUrl += 'users/' + options.userID + '/pins/?limit=' + options.limit + '&callback=?';
                cacheId = 'pinterest-user-' + options.userID;
            }
            else if( options.sourceType === 'board' ) {
                pinterestUrl += 'boards/'+ options.userID + '/' + options.boardID + '/pins/?limit=' + options.limit + '&callback=?';
                cacheId = 'pinterest-board-' + options.boardID;
            }


            // check the cache first
            if( self.options.enableCache ) {
                cacheReq = self.getCache(cacheId);
            }
            else {
                cacheReq = $.Deferred();
                cacheReq.resolve({expired: true});
            }

            cacheReq.done(function(cache) {
                if( !cache.expired ) {
                    configReq.resolve(cache);  // initialize the gallery from cached data
                }
                else {  // cache expired, load fresh data
                    $.ajax({
                        url: pinterestUrl,
                        dataType: 'jsonp',
                        timeout: 5000,
                        success: function(data) {
                            if( !data.data ) {
                                self.fgLog('Pinterest request failed');
                                return;
                            }

                            var config = [];

                            $.each(data.data.pins, function(i) {
                                config[i] = {};

                                config[i].type = 'photo';
                                config[i].sort = {likes: this.like_count};
                                config[i].source = this.images['237x'].url.replace('237x', 'originals');
                                config[i].thumbnail = this.images['237x'].url;
                                config[i].title = this.description;
                                config[i].title += this.like_count > 0 ? '<span class="meta"><span class="likes"><i class="mdi-action-favorite"></i> '+self.formatNumber(this.like_count)+'</span></span>' : '';
                                config[i].description = '&nbsp;';

                                if( i === options.limit - 1 ) {
                                    return false;
                                }
                            });

                            self.options.enableCache && self.updateCache(config, cacheId);  // update the cache file with the loaded data
                            configReq.resolve(config);
                        }
                    });
                }
            });

            return configReq;
        },



        // format the upload date
        formatDate: function (uploaded) {
            var date = !isNaN(uploaded) ? (new Date(uploaded)) : (new Date( Date.parse(uploaded) )),
                day = date.getUTCDate(),
                month = date.getUTCMonth(),
                year = date.getUTCFullYear(),
                monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            return monthNames[month] + ' ' + day + ', ' + year;
        },



        // format the numbers to inset commas
        formatNumber: function(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },



        // shuffle the gallery items
        shuffle: function(items) {
            for(var j, x, i = items.length; i; j = parseInt(Math.random() * i, 10), x = items[--i], items[i] = items[j], items[j] = x);

            return items;
        },



        // function to log messages in a cross-browser manner
        fgLog: function() {
            if( window.console && window.console.log ) {
                console.log('[flowGallery] ' + Array.prototype.slice.call(arguments));
            }
            else {
                alert( '[flowGallery] ' + Array.prototype.slice.call(arguments).join('<br>') );
            }
        }

    };  // end FlowPhotoFeed


    // create the jquery plugin
    $.fn.flowGallerySocialFeed = function(options) {
        var opts = $.extend( true, {}, $.fn.flowGallery.defaults, $.fn.flowGallerySocialFeed.defaults, options );

        // $.extend deep copy merges arrays too, which we don't want
        if( $.isArray(options.sortBy) ) {
            opts.sortBy = options.sortBy;
        }

        return this.each(function () {
            //prevent against multiple instantiations
            if( !$.data(this, 'flowGallerySocialFeed') ) {
                var gallery = Object.create(FlowSocialFeed);
                gallery.init(opts, this);
                $.data(this, 'flowGallerySocialFeed', true);
            }
        });
    };


    $.fn.flowGallerySocialFeed.defaults = {
        feed: 'facebook',  // facebook, instagram, pinterest, dribbble
        sortBy: ['title', 'date', 'likes'],
        facebookOptions: {  // sortby: date, likes, titles
            accessToken: '',
            sourceType: 'photos',  // photos, videos, album, albums
            albumID: '',
            userID: '',
            limit: 30,
            numberOfAlbums: 30
        },
        instagramOptions: {  // sortby: date, likes
            accessToken: '',
            sourceType: 'user',  // user, tag, popular
            userID: '',
            tag: '',
            limit: 30,
            thumbSize: 'low_resolution'  // thumbnail (150x150), low_resolution (306x306)
        },
        dribbbleOptions: {  // sortby: date, likes, views, titles
            accessToken: '',
            sourceType: 'user',  // user, list, bucket, project
            userID: '',
            bucketID: '',
            projectID: '',
            listName: 'popular', // debuts, everyone, popular, animated, teams, rebounds, playoffs, attachments
            showAvatar: true,
            limit: 30  // max-limit 100 set by Dribble
        },
        pinterestOptions: {  // sortby: titles, likes
            sourceType: 'user',  // user, board
            userID: '',
            boardID: '',
            limit: 30  // max 50
        }
    };

}) (jQuery, document, window);