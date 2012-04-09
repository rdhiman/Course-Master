Ext.define('CM.Discussion.Root', {
    extend: 'Ext.grid.Panel',

    initComponent: function() {

        var discussionBoards = Ext.create('Ext.data.Store', {
            fields: [ 'name', 'postCount', 'id' ],
            /*data: [
                { id: '1', name: 'Board 1', postCount: 12 },
                { id: '2', name: 'Board 2', postCount: 3 }
            ]*/
            proxy: {
                type: 'ajax',
                url: '/service/discussion/get-boards',
                extraParams: {
                    userId: SessionGlobals.id,
                    courseId: this.courseId
                },
                reader: {
                    type: 'json',
                    root: 'boards'
                }
            },
            autoLoad: true
        });

        Ext.apply(this, {
            border: false,
            store: discussionBoards,
            id: this.class + '-board-root',
            title: this.class + ' Discussion Board',
            listeners: {
                select: this.onSelect,
                itemdblclick: this.onItemDblClick
            },
            columns: {
                items: [{
                    text: 'Board Name',
                    flex: 1,
                    dataIndex: 'name'
                }, {
                    text: 'Topics',
                    width: 40,
                    align: 'right',
                    dataIndex: 'topicCount'
                }],
                defaults: {
                    draggable: false,
                    resizable: false,
                    hideable: false,
                    sortable: false
                }
            }
        });

        if(SessionGlobals.role == 2) {
            Ext.apply(this, {
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Add Board',
                            listeners: { click: this.addBoard }
                        }
                    ]
                }]
            });
        }

        this.callParent(arguments);
    },

    constructor: function(opt) {
        this.callParent(arguments);

        if(opt.courseId) {
            this.courseId = opt.courseId;
        }

        return this;
    },

    onSelect: function(rowModel, record) {
        console.log("Select fired: " + record.get("id"));
    },
    
    onItemDblClick: function(view, record) {
        console.log("Double clicked: " + record.get("id"));
    },

    addBoard: function() {
        var statusOptions = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [
                { 'id': '1', 'name': 'Open' }
            ]
        });

        Ext.create('widget.window', {
            title: 'Add Discussion Board',
            closable: true,
            width: 300,
            height: 150,
            layout: 'fit',
            items: {
                xtype: 'form',
                url: '/service/discussion/create-board',

                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },

                items: [
                    {
                        xtype: 'textfield',
                        name: 'boardName',
                        fieldLabel: 'Board Name',
                        allowBlank: false
                    },{
                        xtype: 'combobox',
                        name: 'status',
                        fieldLabel: 'Status',
                        editable: false,
                        allowBlank: false,
                        store: statusOptions,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id'
                    },{
                        xtype: 'hidden',
                        name: 'course',
                        value: this.courseId
                    }
                ],

                buttons: [{
                    text: 'Create Board',
                    formBind: true,
                    disabled: true,
                    handler: function() {
                        var form = this.up('form').getForm();
                        if(form.isValid()) {
                            form.submit({
                                success: function() { Ext.Msg.alert("success","success"); },
                                failure: function() { Ext.Msg.alert("Error","Unable to add discussion board."); }
                            });
                        }
                    }
                }]
            }
        }).show();
    },

    courseId: -1
});