const UserCard = ({user}) => {
    const {firstName, lastName, age, gender, about, photoUrl} = user;
    return (
        user && (<div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img className="w-full object-cover"
                    src={photoUrl}
                    alt="User" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
               { age && gender && <p className="justify-center">{age + " " + gender}</p>}
                <p className="justify-center">{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>)
    )
}

export default UserCard;