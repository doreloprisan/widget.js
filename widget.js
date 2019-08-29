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
