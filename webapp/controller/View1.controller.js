sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageBox, MessageToast, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("a5ui.controller.View1", {

        onInit: function () {

            var oTableModel = new JSONModel({
                Items: [
                    {
                        PARTNER: "0010000390",
                        MATKL: "B22INFoo2",
                        STATUS: "1"
                    },
                    {
                        PARTNER: "0010000515",
                        MATKL: "S23MVAR12",
                        STATUS: "2"

                    },
                    {
                        PARTNER: "0010000678",
                        MATKL: "C34TEST01",
                        STATUS: "3"

                    },
                    {
                        PARTNER: "0010000723",
                        MATKL: "D45DEMO02",
                        STATUS: "4"

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

            this.getView().setModel(oTableModel, "tableModel");
            this.getView().setModel(oListModel, "listModel");
        },

        onDisplayPress: function (oEvent) {
            const oRow = oEvent.getSource().getParent().getParent(); // HBox -> ColumnListItem
            const aButtons = oRow.getCells()[0].getItems(); // prima cella = HBox con i bottoni
            const aSelectStatusId = oRow.getCells()[3]; //posizione 3 è la select

            // console.log(aSelectStatusId)
            const oBtnEdit = aButtons[1]; // posizione 1 edit button posizione 0 visualizza button
            const bNewState = !oBtnEdit.getEnabled();
            oBtnEdit.setEnabled(bNewState);
            aSelectStatusId.setEnabled(false)

            if (bNewState) { //true
                MessageBox.information("Reset azione");
                aSelectStatusId.setEnabled(true)
                return;
            }
            MessageToast.show("Visualizza");
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

            MessageToast.show("Modifica");
        },

        onValueHelpRequest: function (oEvent) {

            if (!this.oDialogPartner) {
                this.loadFragment({ name: "a5ui.view.ValueHelp" })
                    .then(function (oDialog) {
                        this.oDialogPartner = oDialog;
                        this.getView().addDependent(oDialog);
                        this.oDialogPartner.setModel(this.getView().getModel("tableModel"), "tableModel");
                        this.oDialogPartner.open();
                    }.bind(this));
            } else {
                this.oDialogPartner.setModel(this.getView().getModel("tableModel"), "tableModel");
                this.oDialogPartner.open();
            }
        },


        onValueHelpRequest2: function (oEvent) {

            if (!this.oDialogMatkl) {
                this.loadFragment({ name: "a5ui.view.ValueHelp2" })
                    .then(function (oDialog) {
                        this.oDialogMatkl = oDialog;
                        this.getView().addDependent(oDialog);
                        this.oDialogMatkl.setModel(this.getView().getModel("tableModel"), "tableModel");
                        this.oDialogMatkl.open();
                    }.bind(this));
            } else {
                this.oDialogMatkl.setModel(this.getView().getModel("tableModel"), "tableModel");
                this.oDialogMatkl.open();
            }

        },


        handleCloseDialog: function () {

            let aContexts = this.byId("partnerTable").getSelectedContexts();
            let oInpPartner = this.byId("inpPartner")
            let aValues = aContexts.map(ctx => ctx.getObject().PARTNER);
            let oToken = ""
            aValues.forEach(element => {
                oToken = new sap.m.Token({ key: element, text: element });
                oInpPartner.addToken(oToken);

            });


            this.oDialogPartner.close();
        },


        handleCloseDialog2: function () {

            let aContexts = this.byId("matklTable").getSelectedContexts();
            let oInpMATKL = this.byId("inpMatkl")
            let oToken = ""
            let aValues = aContexts.map(ctx => ctx.getObject().MATKL);
            aValues.forEach(element => {
                oToken = new sap.m.Token({ key: element, text: element });
                oInpMATKL.addToken(oToken)
            });


            this.oDialogMatkl.close();
        },

        onResetPress: function () {
            debugger;
            let oInpMATKL = this.byId("inpMatkl");
            let oInpPartner = this.byId("inpPartner");
            let oTable = this.byId("tableData")
            let aFilter = [];

            oInpMATKL.removeAllTokens();
            oInpPartner.removeAllTokens();
            oTable.getBinding("items").filter(aFilter, "tableModel");

        },

        onFilterPress: function (oEvent) {

            let oInpMATKL = this.byId("inpMatkl");
            let oInpPartner = this.byId("inpPartner");
            let oTable = this.byId("tableData")
            let aFilter = [];
            let aTokenPartner = []
            let aTokenMATKL = []
            oInpPartner.getTokens().forEach(elem => {
                aTokenPartner = elem.getText()
                debugger;
                let filterPartner = new Filter("PARTNER", FilterOperator.Contains, aTokenPartner)

                aFilter.push(filterPartner)
            })

            oInpMATKL.getTokens().forEach(elem => {
                aTokenMATKL = elem.getText()
                let filterMatkl = new Filter("MATKL", FilterOperator.Contains, aTokenMATKL)

                aFilter.push(filterMatkl)

            }
            )

            oTable.getBinding("items").filter(aFilter, "tableModel");

        },


    });
});