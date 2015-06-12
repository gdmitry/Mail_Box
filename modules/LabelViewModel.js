
define(function () {
    function LabelViewModel(label) {
        this.id = label.id;
        this.name = label.name;
        this.color =  ko.observable(label.color);
        this.status = ko.observable('enabled');
    };

    LabelViewModel.prototype.changeStatus = function () {
        if (this.status() === 'enabled') {
            this.status("disabled");
        } else {
            this.status("enabled");
        }
    };

    LabelViewModel.prototype.changeColor = function () {
        var color = prompt("Please enter color value");
        if (color != null) {
            this.color(color);
        }
    }

    LabelViewModel.mapLabels = function (labels) {
        var out = [];
        labels.map(function (label) {
            out.push(new LabelViewModel(label));
        });
        return out;
    }

    return LabelViewModel;
});