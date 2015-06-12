

define(['./Configuration', './LabelViewModel', './MailViewModel', './FolderViewModel'], function (config, LabelViewModel, MailViewModel, FolderViewModel) {

    function MailBoxViewModel(mailbox) {

        var emails = MailViewModel.mapMails(mailbox.emails);

        this.folders = ko.observableArray(FolderViewModel.mapFolders(config.folders));

        this.folder = ko.observable(this.folders()[0]);

        this.labels = ko.observableArray(LabelViewModel.mapLabels(mailbox.labels));

        this.emailsByFolder = ko.computed(function () {
            var emailsByFolder = MailViewModel.getEmailsByFolder(emails, this.folder());
            return emailsByFolder;
        }, this);

        this.emailsByLabels = ko.computed(function () {
            var emailsByLabels = MailViewModel.getEmailsByLabels(emails, this.labels());
            return emailsByLabels;
        }, this);

        this.email = ko.observable();

        this.emails = ko.computed(function () {
            var emailsByLabels = this.emailsByLabels();
            var emails;
           
            emails = this.emailsByFolder().filter(function (email) {
                return emailsByLabels.indexOf(email) !== -1;
            });
            if (emails.length !== 0) {
                this.email(emails[0]);
            };
            return emails;
        }, this);
        
        this.isVisibleEditEmails = ko.observable(false);

        this.isVisibleEmailDetails = ko.computed(function () {
            if (!this.isVisibleEditEmails() && this.emails().length)
                return true;
            return false;
        }, this);

        this.editMail = ko.observable(new MailViewModel({}));
        this.selectedLabels = ko.observableArray([]);
        this.saveMail = function () {
            this.editMail().labels = this.selectedLabels();
            emails.push(this.editMail());
            console.log(emails);
            this.labels(this.labels());
            this.isVisibleEditEmails(false);
        };

        this.sendMail = function (mail) {
            mail.folder = "sent";
            this.labels(this.labels());
            this.folder(this.folder());
        };
        
    }

    MailBoxViewModel.prototype.createLabel = function () {
        var labelName = prompt("Please enter label name");
        var id = this.labels()[this.labels().length-1];
        var label;
        if (labelName != null) {
             label = {"id": id, "name": labelName, "color": "#fff", status: ko.observable('enabled') };
            this.labels.push(new LabelViewModel(label));
        }
    }

    MailBoxViewModel.prototype.createFolder = function () {
        var folderName = prompt("Please enter folder name");
        if (folderName != null) {
            this.folders.push({ "name": folderName.toLowerCase(), "displayName": folderName });
        }
    }

     MailBoxViewModel.prototype.createFolder = function () {
         var folderName = prompt("Please enter folder name");
         var folder;
         if (folderName != null) {
             folder = { "name": folderName.toLowerCase(), "displayName": folderName, "isDeletable": "yes" };
            this.folders.push(new FolderViewModel(folder));
        }
     }

     MailBoxViewModel.prototype.deleteFolder = function (folder) {
         this.folders.splice(this.folders.indexOf(folder), 1);
         this.folder(this.folders()[0]);
     }
     

    MailBoxViewModel.prototype.compose = function () {
        this.isVisibleEditEmails(true);
        this.editMail(new MailViewModel({}));

    };

    MailBoxViewModel.prototype.deleteLabel = function (label) {
        this.labels.splice(this.labels.indexOf(label), 1);
    };

    return MailBoxViewModel;
});