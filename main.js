require.config({
    paths: {
        'text':
        'lib/text',      
        'json': 'lib/json'      
    }
});

requirejs(["./modules/MailBoxViewModel", './modules/MailBoxModel'], function (MailBoxViewModel, emails) {
    var viewmodel = new MailBoxViewModel(emails);
    ko.applyBindings(viewmodel);
});