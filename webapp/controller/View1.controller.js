sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
     "sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("a5ui.controller.View1", {

        onInit: function () {

            var oTableModel = new JSONModel({
                Items: [
                    {
                        PARTNER: "0010000390",
                        MATKL: "B22INFoo2",
                    },
                    {
                        PARTNER: "0010000515",
                        MATKL: "S23MVAR12",

                    },
                    {
                        PARTNER: "0010000678",
                        MATKL: "C34TEST01",

                    },
                    {
                        PARTNER: "0010000723",
                        MATKL: "D45DEMO02",

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

        onDisplayPress: function (oEvent) {
            const oRow = oEvent.getSource().getParent().getParent(); // HBox -> ColumnListItem
            const aButtons = oRow.getCells()[0].getItems(); // prima cella = HBox con i bottoni
            const aSelectStatusId = oRow.getCells()[3]; //posizione 3 è la select
            console.log(aSelectStatusId)
            const oBtnEdit = aButtons[1]; // posizione 1 edit button posizione 0 visualizza button

           
            const bNewState = !oBtnEdit.getEnabled();
            oBtnEdit.setEnabled(bNewState);
            aSelectStatusId.setEnabled(false)

        
            if (bNewState) { //true
                MessageBox.information("Reset azione");
                aSelectStatusId.setEnabled(true)
                return;
            }
            sap.m.MessageToast.show("Visualizza");
        },

        onEditPress: function (oEvent) {
            const oRow = oEvent.getSource().getParent().getParent();
            const aButtons = oRow.getCells()[0].getItems();

            const oBtnDisplay = aButtons[0];


            
            const bNewState = !oBtnDisplay.getEnabled();
            oBtnDisplay.setEnabled(bNewState);

        
            if (bNewState) { //true
                MessageBox.information("Reset modalità");
                return;
            }

            sap.m.MessageToast.show("Modifica");
        },



    });
});