function calcpay(hours,wage,tax,fica){

    let gross = (hours*wage);
    alert(gross);
    let taxes = (gross*tax).toFixed(2);
    alert(taxes);
    let fica_reduction = gross*fica;
    alert(fica_reduction);
    let take_home = (gross-taxes-fica_reduction).toFixed(2);
    alert(take_home);

    return take_home;
}