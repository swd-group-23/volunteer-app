import React from 'react'
import {User} from '../../types.ts';

interface cardRequest {
    userInfo: User
}

const DetailsCard: React.FC<cardRequest> = ({
    userInfo
}) => {
    return (
        <div className="card my-2">
            <div className="card-body">
                <h5>User Name : {userInfo.name} <br /><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>Email : {userInfo.email}</h5>

            </div>
        </div>
    )
}

export default DetailsCard