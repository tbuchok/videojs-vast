var wd = require('wd')
  , assert = require('assert')
  , browser
;

// Check for Sauce Labs' environment variables:
if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
  browser = wd.remote('ondemand.saucelabs.com'
                      , 80
                      , process.env.SAUCE_USERNAME
                      , process.env.SAUCE_ACCESS_KEY
                      )
} else {
  // Default to http://localhost:4444/wd/hub
  browser = wd.remote();
}

browser.on('status', function(info) {
  console.log(info);
});

browser.on('command', function(meth, path, data) {
  console.log(' > ' + meth, path, data || '');
});

var chrome = {
    browserName:'chrome'
    , tags : ["examples"]
    , name: "This is an example test"
  };

browser.init(chrome, function() {
    browser.get("http://localhost:1337/examples", function(err) {
        browser.title(function(err, title) {
          assert.ok(~title.indexOf('I am a page title - Sauce Labs'), 'Wrong title!');
          browser.elementById('submit', function(err, el) {
            browser.clickElement(el, function() {
              browser.eval("window.location.href", function(err, href) {
                assert.ok(false, 'Wrong URL!');
                browser.quit()
              })
            })
          })
        })
      })
  });