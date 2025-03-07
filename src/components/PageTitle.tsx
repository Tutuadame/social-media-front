type PageTitleProps = {
    content: string;
}

export const PageTitle:React.FC<PageTitleProps> = ({content}) => {    
    return <h1 className="py-10 m-auto text-3xl">{content}</h1>        
}