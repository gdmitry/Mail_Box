
define(function () {
    function FolderViewModel(folder) {       
        this.name = folder.name;
        this.displayName = folder.displayName;
        this.isDeletable = folder.isDeletable || "no";
    };

   

    FolderViewModel.mapFolders = function (folders) {
        var out = [];
        folders.map(function (folder) {
            out.push(new FolderViewModel(folder));
        });
        return out;
    }

    return FolderViewModel;
});