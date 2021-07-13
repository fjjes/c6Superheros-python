const ColorEveryOtherChild = ({children}) => {
    const blueStyle = {
        backgroundColor: 'blue'
    }
    const greyStyle = {
        backgroundColor: 'gray'
    }
    const wrappedChildren = children.map((child, index)=> {
        if ((index % 2) === 0 ){
            //even row
            return  <div style={blueStyle}>{child}</div>
        }else{
            //odd row
            return <div style={greyStyle}>{child}</div>
        }
    })
    return wrappedChildren;
}
 
export default ColorEveryOtherChild;