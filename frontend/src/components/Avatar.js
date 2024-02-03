function Avatar({ manager }){

    return(
        <div ><img className="mediumAvatar" src={`/headshots/${manager._id}.png`} alt="" /></div>
    )
}

export default Avatar