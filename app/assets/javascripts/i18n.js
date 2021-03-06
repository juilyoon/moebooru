var I18n = function () {
  this.locale = jQuery.cookie('locale') || 'en';
  this.template = {
    error: "Error",
    denied: "access denied",
    voting: "Voting",
    vote_saved: "Voting saved",
    'vote.remove': "Remove vote",
    'vote.good': "Good",
    'vote.great': "Great",
    'vote.fav': "Favorite",
    '__default__': "no translations"
  };
  if (this.locale !== 'en') {
    this.fetch(this.locale);
  }
};

I18n.prototype.fetch = function (locale) {
  var th = this;
  try {
    jQuery.ajax('/assets/'+locale+'.json', {
      dataType: 'json'
    }).done(function (data) {
      th.template = data;
    });
  } catch (error) {}
  return false;
};

I18n.prototype.translate = function (label) {
  if (arguments.length > 1) {
    return this.subst(arguments);
  }
  return this.template[label] || this.template['__default__'];
};

I18n.prototype.subst = function () {
  var args = arguments,
      tl = this.template[arguments[0]] || this.template['__default__'];
  function repl(str, p1, off, s) {
    return args[p1];
  }
  return tl.replace(/\$(\d+)/g, repl);
};

var i18n = new I18n(),
    t = function(label) {
      return i18n.translate(label);
    };
