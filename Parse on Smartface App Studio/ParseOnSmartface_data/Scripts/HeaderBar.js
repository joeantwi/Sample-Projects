function HeaderBar() {
    this.navigationItem = null;
    this.actionBar = null;
    this.isAndroid = Device.deviceOS == "Android" ? true : false; //A control variable to check the environment is Android Operating System
    //Initilaizes actionbar / navigation item for the page which is provided with the parameter
    this.init = function (page) {
        //Sets ActctionBar for Android
        if (this.isAndroid == true) {
            this.actionBar = page.actionBar;
            this.actionBar.visible = true;
            this.actionBar.backgroundColor = "#FFFFFF";
        } else {
            //Sets NavigationITem for iOS
            this.navigationItem = page.navigationItem;
            SMF.UI.iOS.NavigationBar.visible = true;
        }
    }
    //Sets the visitble Title text in ActibonBar/NavigationItem
    this.setTitle = function (title) {
        if (this.isAndroid == true) {
            this.actionBar.titleView = {
                type : SMF.UI.TitleViewType.text,
                text : title,
                textSize : 16,
                left : 50,
                alignment : SMF.UI.Alignment.center
            };
        } else {
            this.navigationItem.title = title;
        }
    }
    //Sets the button on right side of the title with the provided text
    this.setRightItem = function (itemTitle) {
        function onAction(e) {
            alert("RightItem: " + this.title);
        }
        var key = {
            id : 0,
            type : SMF.UI.TitleViewType.text,
            fontName:"Default",
            title : itemTitle,
            onSelected : onAction,
            fontSize : 16
        };
        if (this.isAndroid && this.actionBar) {
            key.showAsAction = SMF.UI.Android.ShowAsAction.always; //Always place this item in the Action Bar. Avoid using this unless it's critical that the item always appear in the action bar. Setting multiple items to always appear as action items can result in them overlapping with other UI in the action bar.
            var item = new SMF.UI.Android.MenuItem(key);
            this.actionBar.menuItems = [item];
        } else if (!this.isAndroid) {
            var item = new SMF.UI.iOS.BarButtonItem(key);
            this.navigationItem.rightBarButtonItems = [item];
        }
    }
    // Sets a pressible item to the left of the title
    this.setLeftItem = function () {

        if (this.isAndroid == true) {
            this.actionBar.displayHomeAsUpEnabled = true;
            this.actionBar.displayShowHomeEnabled = false;
            this.actionBar.displayShowTitleEnabled = true;
            this.actionBar.title = "Back";
            this.actionBar.subtitle = "Subtitle";
            this.actionBar.onHomeIconItemSelected = function () {
                alert("Home pressed!");
            }
        } else {
            var leftItem = new SMF.UI.iOS.BarButtonItem({
                    systemItem : SMF.UI.iOS.BarButtonType.cancel,
                    onSelected : function () {
                        alert("Cancel Pressed");
                    }
                });
            this.navigationItem.leftBarButtonItems = [leftItem];
        }
    }
}