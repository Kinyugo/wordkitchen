import './styles.css'

function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if(type === 'blockquote') {
        return 'superFancyBlockquote';
    }else if( type === 'header-one' || type === 'header-two' || type === 'header-three') {
        return 'superFancyHeaders';
    } else if( type === 'code-block'){
        return 'superFancyCodeBlock'
    }else if (type === 'unstyled'){
        return 'paragraph'
    }
}

export default myBlockStyleFn;