
define(function () {

    var lookForEmails = function (prop, value, emails) {
        var result = [];

        emails.forEach(function (email) {
            if (value === undefined) {
                result.push(email[prop]);
            } else {
                if (email[prop] === value) {
                    result.push(email);
                }
            }
        });

        return result;
    };

    function getTime() {
        var currentdate = new Date();
        return currentdate.getHours() + ":"
                 + currentdate.getMinutes();
    }

    function getDate() {
        var currentdate = new Date();
        return (currentdate.getMonth() + 1) + "/"
                    + currentdate.getDate() + "/"
                    + currentdate.getFullYear();
    }

    function MailViewModel(mail) {
        this.id = mail.id;
        this.sender = mail.sender;
        this.to = mail.to;
        this.labels = mail.labels;
        this.title = mail.title;
        this.time = mail.time || getTime();
        this.date = mail.date || getDate();
        this.message = mail.message;
        this.folder = mail.folder || "drafts";
        this.status = ko.computed(function () {
            if (this.folder === "inbox") {
                return "unread";
            }
        });
    };

    /* MailViewModel.prototype.setFolder = function (folder) {
         this.folder = folder;
         
     };
     */
    MailViewModel.mapMails = function (mails) {
        var out = [];
        mails.map(function (mail) {
            out.push(new MailViewModel(mail));
        });
        return out;
    };

    MailViewModel.getEmailsByLabels = function (emails, labels) {
        var filteredEmails;

        filteredEmails = emails.filter(function (email) {
            emailLabels = email.labels;
            return emailLabels.some(function (emailLabel) {
                return (labels.some(function (label) {
                    if (label.status() === 'enabled' && emailLabel.id === label.id) {
                        return true;
                    }
                }));
            });
        });

        return filteredEmails;
    }

    MailViewModel.getEmailsByFolder = function (emails, folder) {
        var resultEmails = lookForEmails("folder", folder.name, emails);
        return resultEmails;
    };

    MailViewModel.getEmailById = function (id, emails) {
        var resultEmail = lookForEmails("id", id, emails);
        return resultEmail[0];
    };

    return MailViewModel;
});