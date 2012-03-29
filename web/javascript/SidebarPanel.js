Ext.define("CM.Sidebar.Class", {
    extend: "Ext.button.Button",

    initComponent: function() {

        Ext.apply(this, {
            text: this.class,
            cls: 'sidebar-class',
            border: false,
            height: 25,
            margin: '0 0 5',
            itemId: this.class + '-link',
            handler: this.expandFunction,
            //html: "root<br/>discussion<br/>forum",
            //listeners: {
            //    expand: this.expandFunction,
            //    beforeCollapse: this.collapseFunction
            //}
        });

        this.callParent(arguments);
    },

    expandFunction: function(btn, evt) {

        if (!PageGlobals.contentPanel.getChildByElement(btn.text + "-class")) {
            PageGlobals.contentPanel.add(new CM.Class.Home({ class: btn.text }));
        }

        PageGlobals.contentPanel.getLayout().setActiveItem(btn.text + '-class');
    }
});
