function Avatar({ manager, size }){

    return(
        <div ><img className={size} src={`/headshots/${manager._id}.png`} alt="" /></div>
    )
}

export default Avatar