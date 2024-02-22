function Avatar({ manager, size }){

    return(
        <div ><img className={size} src={`/headshots/${manager.user_id}.png`} alt="" /></div>
    )
}

export default Avatar