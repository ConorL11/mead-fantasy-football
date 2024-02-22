function LoadingMessage({ message }){

    return(
        <div className="loadingContainer">
            <div>Loading {message} Data.....</div>
            <div className="spinner"></div>
        </div>
    )
}

export default LoadingMessage;

