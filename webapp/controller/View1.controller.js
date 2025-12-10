sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("a5ui.controller.View1", {
        
        onInit: function() {
        
            var oTableModel = new JSONModel({
                Items: [
                    {
                        PARTNER: "0010000390",
                        MATKL: "B22INFoo2",
                        STATUS: "001"
                    },
                    {
                        PARTNER: "0010000515",
                        MATKL: "S23MVAR12",
                        STATUS: "002"
                    },
                    {
                        PARTNER: "0010000678",
                        MATKL: "C34TEST01",
                        STATUS: "001"
                    },
                    {
                        PARTNER: "0010000723",
                        MATKL: "D45DEMO02",
                        STATUS: "003"
                    }
                ]
            });
    
            var oListModel = new JSONModel({
                ProductCollection2: [
                    { key: "001", Name: "Prova1" },
                    { key: "002", Name: "Prova2" },
                    { key: "003", Name: "Prova3" },
                    { key: "004", Name: "Prova4" }
                ],
                
            });
            
            this.getView().setModel(oTableModel);
            this.getView().setModel(oListModel, "listModel");
        },
        
        // Handlers per i bottoni
        onDisplayPress: function(oEvent) {
            debugger;
            let editBtn = this.byId("editButton").getProperty("\enabled");
            sap.m.MessageToast.show("Visualizza");
            editBtn = false;
            
        },
        
        onEditPress: function(oEvent) {
            sap.m.MessageToast.show("Modifica riga");

        }
        
    });
});