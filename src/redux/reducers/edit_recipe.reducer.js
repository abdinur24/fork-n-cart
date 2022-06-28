const edit =(state = [], action)=>{
    switch(action.type){
        case 'EDIT_RECIPE':
            return  action.payload;
        default:
            return state     
    }
}


export default edit;