/**
 * Created by liuzhencai on 16/7/7.
 */

Ext.define("program.store.RenameStore",{
    extend:"Ext.data.JsonStore",
    fields:["Object_Name", "Description", "Present_Value", "Max_Pres_Value", "Min_pres_Value", "High_Limit", "Low_Limit", "COV_Increment", "Device_Type", "Offset"]
    //autoLoad:true

})