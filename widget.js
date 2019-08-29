(function() {
    //Load Stylesheet
    var root = 'https://keyreply.com';
    var head = document.getElementsByTagName('head')[0],
        stylesheet = document.createElement('link');
    stylesheet.type = 'text/css';
    stylesheet.rel = 'stylesheet';
    stylesheet.href = root + '/chat/widget.css';
    head.appendChild(stylesheet);

    setTimeout(function() {
        (window.jQuery && init()) || loadScript("https://code.jquery.com/jquery-3.1.1.min.js", init);
    }, 1000);

    function loadScript(url, callback) {

        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function() {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function init() {
        var $ = window.jQuery;

        var settings = {},
            script = $('#keyreply-script'),
            site = window.location.host,
            salt = '\x26\x63\x69\x64\x3D' + Math.round(2147483647 * Math.random()),
            kga = ["aHR0cHM6Ly9zc2wuZ29vZ2xlLWFuYWx5dGljcy5jb20vY29sbGVjdD92PTEmdGlkPVVBLTU1OTEzMzY2LTEz", "JnQ9cGFnZXZpZXcmZGw9", "JnQ9ZXZlbnQmZWM9aW50ZXJhY3Rpb24mZWE9YWN0aXZhdGU="],
            cipher = script.data('apps'),
            align = script.data('align'),
            whitelabel = script.data('whitelabel'),
            colors = {
                skype: '#00AFF0',
                whatsapp: '#30BE2D',
                email: '#2D70E7',
                sms: '#0AD02C',
                phone: '#0AD02C',
                facetime: '#0DD12F',
                telegram: '#2DA5E1',
                facebook: '#0084FF',
                kakao: '#FBDE24',
                line: '#3ACE01',
                snapchat: '#FFFC00',
                wechat: '#1ECE29',
                reddit: '#017AD4',
                twitter: '#2DAAE1',
                hipchat: '#274970',
                slack: '#423843',
                handouts: '#70AD46'
            };

        settings.apps = JSON.parse(decodeURI(atob(cipher)));
        settings.tags = {
            page: [atob(kga[0]), atob(kga[1]), site, salt].join(''),
            event: [atob(kga[0]), atob(kga[2]), salt].join('')
        }

        settings.color = script.data('color');
        var numberOfApps = Object.keys(settings.apps).length;
        if (!Mobile) {
            if (settings.apps.sms) numberOfApps--;
            if (settings.apps.kakao) numberOfApps--;
        }

        var maxIconCount = Math.floor((window.innerHeight - 130) / 52);

        var anchor = $('<div>')
            .attr('id', 'keyreply-container')
            .appendTo($('body'));

        if (align == 'left') {
            anchor.addClass('left');
        }

        var launcher = $('<div>')
            .addClass('keyreply-launcher')
            .addClass('keyreply-effect')
            .css('background-image', 'url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='612' height='612'%3E%3Cpath d='M257.938 336.072c0 17.355-14.068 31.424-31.423 31.424-17.354 0-31.422-14.068-31.422-31.424 0-17.354 14.068-31.423 31.422-31.423 17.355.001 31.423 14.07 31.423 31.423zm127.547-31.422c-17.354 0-31.423 14.068-31.423 31.424 0 17.354 14.069 31.422 31.423 31.422s31.424-14.068 31.424-31.422c-.001-17.355-14.069-31.424-31.424-31.424zM612 318.557v59.719c0 29.982-24.305 54.287-54.288 54.287h-39.394C479.283 540.947 379.604 606.412 306 606.412s-173.283-65.465-212.318-173.85H54.288C24.305 432.562 0 408.258 0 378.275v-59.719c0-20.631 11.511-38.573 28.46-47.758.569-84.785 25.28-151.002 73.553-196.779C149.895 28.613 218.526 5.588 306 5.588c87.474 0 156.105 23.025 203.987 68.43 48.272 45.777 72.982 111.995 73.553 196.779 16.949 9.186 28.46 27.128 28.46 47.76zm-114.901 17.714c0-13.969-.715-27.094-1.771-39.812-24.093-22.043-67.832-38.769-123.033-44.984 7.248 8.15 13.509 18.871 17.306 32.983-33.812-26.637-100.181-20.297-150.382-79.905a158.89 158.89 0 0 1-7.519-9.417c-.025-.035-.053-.062-.078-.096l.006.002c-8.931-12.078-11.976-19.262-12.146-11.31-1.473 68.513-50.034 121.925-103.958 129.46-.341 7.535-.62 15.143-.62 23.08 0 28.959 4.729 55.352 12.769 79.137 30.29 36.537 80.312 46.854 124.586 49.59 8.219-13.076 26.66-22.205 48.136-22.205 29.117 0 52.72 16.754 52.72 37.424 0 20.668-23.604 37.422-52.72 37.422-22.397 0-41.483-9.93-49.122-23.912-30.943-1.799-64.959-7.074-95.276-21.391C198.631 535.18 264.725 568.41 306 568.41c64.859 0 191.099-81.935 191.099-232.139zm53.756-72.002C547.4 116.318 462.951 38.162 306 38.162S64.601 116.318 61.145 264.269h20.887c7.637-49.867 23.778-90.878 48.285-122.412C169.37 91.609 228.478 66.13 306 66.13c77.522 0 136.63 25.479 175.685 75.727 24.505 31.533 40.647 72.545 48.284 122.412h20.886z'/%3E%3C/svg%3E");')
            .css('background-color', settings.color)
            .appendTo(anchor)
            .click(function() {
                launcher.addClass('keyreply-show-effect');
                setTimeout(function() {
                    launcher.removeClass('keyreply-show-effect')
                }, 700);
            });

 //       if (!whitelabel) {
  //          var brand = $('<a href="https://www.mammamiapizzeria.ro/#contacteaza-ne" rel="nofollow">Contact</a>')
   //             .addClass('keyreply-brand')
   //             .appendTo(launcher)
   //             .click(function(event) {
  //                  event.stopPropagation();
 //               });
//        }

        var ua = navigator.userAgent;
        var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
        var Android = !!ua.match(/Android/i)
        var Mobile = !!ua.match(/Mobi/i)
        var Mac = !!ua.match(/Macintosh/i)

        $.get(settings.tags.page);

        var i = 0;
        $.each(settings.apps, function(key, value) {
            if (Mobile || (key != 'sms' && key != 'kakao')) {
                $('<div>')
                    .addClass('keyreply-chat-icon')
                    .attr('data-type', key)
                    .css('background-color', colors[key])
                    .append(
                        $('<img>')
                        .attr('src', root + '/chat/images/apps/' + key + '.svg')
                        .attr('alt', key)
                    )
                    .append($('<div class="keyreply-label">').text(key.charAt(0).toUpperCase() + key.slice(1)))
                    .hide()
                    .appendTo(anchor);
            }
        });

        //Add a more icon
        var more = $('<div>')
            .css('background-color', '#888888')
            .addClass('keyreply-chat-icon')
            .attr('data-type', 'more')
            .append(
                $('<img>')
                .attr('src', root + '/chat/images/apps/' + 'more' + '.svg')
                .attr('alt', 'more')
            )
            .append($('<div class="keyreply-label">').text('More').css('color', 'white'))
            .hide()
            .click(function() {
                anchor.find('.keyreply-chat-icon').each(function(index, img) {
                    img = $(img);

                    if (index <= numberOfApps - maxIconCount) {
                        if (img.is(':visible')) {
                            img.animate({
                                'bottom': "",
                                'right': "",
                                'opacity': 0
                            }, 'fast', function() {
                                img.hide();
                            });

                        } else {
                            //Setting
                            var option = {
                                'opacity': 1,
                                'bottom': 72 + index % maxIconCount * 52
                            }

                            option[(align == 'left' ? 'left' : 'right')] = 52 + 16 + Math.floor(index / maxIconCount) * 52;
                            option[(align == 'left' ? 'right' : 'left')] = "auto";
                            img.show().animate(option, 'fast');
                        }
                    }
                });
            });

        if (numberOfApps > maxIconCount) {
            more.appendTo(anchor);
        }

        $(window).resize(function() {
            maxIconCount = Math.floor((window.innerHeight - 130) / 52);
            if (numberOfApps > maxIconCount) {
                more.appendTo(anchor);
            } else {
                more.detach();
            }
        });


        launcher.click(function() {
            $('#keyreply-container > .keyreply-chat-icon').each(function(index, img) {
                img = $(img)
                if (launcher.is('.keyreply-launcher-active')) {
                    img.animate({
                        'bottom': 20,
                        'right': 16,
                        'opacity': 0
                    }, 'fast', function() {
                        img.css('right', '')
                            .css('bottom', '')
                            .hide();
                    });

                } else {
                    if (numberOfApps > maxIconCount) {
                        if (index > numberOfApps - maxIconCount) {
                            img.show().animate({
                                'opacity': 1,
                                'bottom': 72 + (maxIconCount - ((numberOfApps - index) % maxIconCount) - 1) * 52,
                            }, 'fast');
                        }
                    } else {
                        img.show().animate({
                            'opacity': 1,
                            'bottom': 72 + index * 52,
                        }, 'fast');
                    }
                }
            });

            if (!launcher.is('.keyreply-launcher-active')) {
                $.get(settings.tags.event);
            }

            launcher.toggleClass('keyreply-launcher-active');
        })

        $('.keyreply-chat-icon').each(function(index, icon) {
            var link, qr, app = $(icon);
            var container = $('<div>').addClass('keyreply-qr');

            switch (app.data('type')) {
                case 'email':
                    link = "mailto:" + settings.apps.email;
                    break;
                case 'sms':
                    link = "sms:" + settings.apps.sms;
                    break;
                case 'phone':
                    if (Mobile) {
                        link = "tel:" + settings.apps.phone;
                    } else {
                        container.css('color', 'white').css('padding-top', '32px')
                        $('<a target="_blank" class="keyreply-button">').attr('href', "tel://" + settings.apps.phone).text(settings.apps.phone).appendTo(container);
                        qr = true;
                        break;
                    }
                    break;
                case 'facetime':
                    link = "facetime-audio:" + settings.apps.facetime;
                    break;
                case 'telegram':
                    link = "tg://resolve?domain=" + settings.apps.telegram.replace('@', '');
                    break;

                case 'skype':
                    link = "skype:" + (iOS ? "//" : "") + settings.apps.skype + "?chat";
                    break;

                case 'facebook':
                    if (iOS) {
                        link = "fb-messenger://user-thread/" + settings.apps.facebook;
                    } else if (Android) {
                        link = "fb-messenger://user/" + settings.apps.facebook;
                    } else if (!Mobile) {
                        link = "https://m.me/" + settings.apps.facebook;
                    }
                    break;
                case 'kakao':
                    app.find('.keyreply-label').css('color', '#1F1F1F');
                    link = "http://goto.kakao.com/" + settings.apps.kakao;
                    break;

                case 'reddit':
                    //Deeplink not possible
                    link = "https://www.reddit.com/message/compose/?to=" + settings.apps.reddit;
                    break;

                case 'twitter':
                    if (Mobile) {
                        link = "twitter://user?screen_name=" + settings.apps.twitter.replace('@', '');
                    } else {
                        link = "https://twitter.com/" + settings.apps.twitter.replace('@', '');
                    }
                    break;

                case 'whatsapp':
                    if (Mobile) {
                    link = 'whatsapp://send/?phone=' + encodeURIComponent(settings.apps.whatsapp) + '&text=' + encodeURIComponent(settings.message || "Info pizza")
                  } else {
                    link = 'https://web.whatsapp.com/send?phone=' + encodeURIComponent(settings.apps.whatsapp) + '&text=' + encodeURIComponent(settings.message || "Info pizza")
                  }
                    break;

                case 'wechat':
                    container.css('background-image', 'url("' + settings.apps.wechat + '")');
                    qr = true;
                    break;
                case 'line':
                    var match = settings.apps.line.match(/ti\/p\/.+/)
                    if (match) {
                        if (Mobile) {
                            link = "line://" + match[0];
                        } else {
                            link = settings.apps.line;
                        }
                    } else {
                        container.css('color', 'white').css('padding-top', '32px').text("Line ID: " + settings.apps.line)
                        $('<br><a class="keyreply-button" href="line://">Open Line</a>').appendTo(container);
                        qr = true;
                    }

                    break;
                case 'snapchat':
                    app.find('.keyreply-label').css('color', '#1F1F1F');
                    container.css('background-image', 'url("' + settings.apps.snapchat + '")');
                    qr = true;
                    break;

                default:
                    break;
            }

            if (qr) {
                app.append(container);
            }

            app.click(function() {
                if (qr) {
                    if (app.is('.keyreply-panel')) {
                        app.removeClass('keyreply-panel');
                    } else {
                        app.siblings().removeClass('keyreply-panel');
                        app.addClass('keyreply-panel');
                    }
                }

                if (link) {
                    app.siblings().removeClass('keyreply-panel');

                    if (Mobile) {
                        window.location = link;
                    } else {
                        var a = $('<a>').attr('target', '_blank').attr('href', link);
                        a.appendTo(anchor)[0].click();
                        a.detach();
                    }
                }
            });
        });

        window.initializeKeyreply = init;
        return true;
    };
})();
