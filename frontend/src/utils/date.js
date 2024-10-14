export const formatDate = (datestring) =>{

    const date = new Date(datestring);
    if(isNaN(date.getTime())){
        return "invalid Date"
    }

    return date.toLocaleString("en-US", {

        year:"numeric",
        month:"short",
        hour:"2-digit",
        minute:"2-digit",
        hour12:"true"
    });
};