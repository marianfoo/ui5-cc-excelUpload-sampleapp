sap.ui.define(["sap/ui/core/mvc/Controller"],
    function (Controller) {
        "use strict";
        return {
            /**
             * Create Dialog to Upload Excel and open it
             * @param {*} oEvent 
             */
             openExcelUploadDialog: async function (oEvent) {

                this.getView().setBusyIndicatorDelay(0)
                // this.getView().setBusy(true)
                if (!this.excelUpload) {
                    this.excelUpload = await sap.ui.getCore().createComponent({
                        name: "thirdparty.customControl.excelUpload",
                        async: false,
                        componentData: {
                            context: this,
                            columns: ["product_ID", "quantity", "title", "price"],
                            mandatoryFields: ["product_ID", "quantity"],
                            excelFileName: "Test.xlsx"
                        }
                    });

                    // event to check before uploaded to app
                    this.excelUpload.attachCheckBeforeRead(function(oEvent) {
                        // example
                        const sheetData = oEvent.getParameter("sheetData");
                        let errorArray = [
                        		{
                        			title: "Price to high (max 100)",
                        			counter: 0,
                        		},
                        	];
                        	for (const row of sheetData) {
                        		//check for invalid date
                        		if (row.UnitPrice) {
                        			if(row.UnitPrice > 100){
                                        errorArray[0].counter = errorArray[0].counter + 1
                                    }
                        		}
                        	}
                        oEvent.getSource().addToErrorsResults(errorArray)
                    }, this)

                    // event to change data before send to backend
                    this.excelUpload.attachChangeBeforeCreate(function(oEvent) {
                        oEvent.getSource().setPayload({
                            "product_ID": "123",
                            "quantity": 1,
                            "title": "Test",
                            "price": 25
                        })
                    }, this)
                }
                this.excelUpload.openExcelUploadDialog()
                this.getView().setBusy(false)
            }
        };
    });