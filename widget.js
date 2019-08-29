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
            .css('background-image', 'url("data:image/svg+xml;base64,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")')
            //.css('background-color', settings.color)
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
