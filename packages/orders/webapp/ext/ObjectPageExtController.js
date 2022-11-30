sap.ui.define(["sap/ui/core/mvc/Controller", "thirdparty/customControl/excelUpload/ExcelUpload"],
    function (Controller, ExcelUpload) {
        "use strict";
        return {
            /**
             * Create Dialog to Upload Excel and open it
             * @param {*} oEvent 
             */
             openExcelUploadDialog: async function (oEvent) {    
                this._options = {
                    context: this,
                    columns: ["product_ID", "quantity","title","price"],
                    mandatoryFields: ["product_ID", "quantity"]
                }
                this._view.setBusyIndicatorDelay(0)
                // this._view.setBusy(true)
                if(!this.excelUploadController){
                    this.excelUploadController = await Controller.create({ name:"cc.excelUpload.ExcelUpload"})
                    this.excelUploadController.setContext(this._options)  
                }          
                this.excelUploadController.openExcelUploadDialog()          
                this.excelSheetsData = [];
                this._view.setBusy(false)
            }
        };
    });