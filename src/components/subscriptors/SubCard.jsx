import React from 'react';

const SubCard = ({sub}) => {
    return (  
        <div className="card my-3">
            <h3 className="card-header bg-primary text-white">Borrower Data</h3>

            <div className="card-body">
                <p className="font-weight-bold"> 
                    Name: <span className="font-weight-normal">{sub.name}</span> 
                </p>

                <p className="font-weight-bold"> 
                    Code: <span className="font-weight-normal">{sub.code}</span> 
                </p>

                <p className="font-weight-bold"> 
                    Degree: <span className="font-weight-normal">{sub.degree}</span> 
                </p>
            </div>
        </div>
    );
}
 
export default SubCard;