import React from 'react'
import delPic from '../../../../images/Slett.jpg'
import editNamePic from '../../../../images/redigerInverted.png'

export default function Projectheadline(props){



  return(
    <div className = "project-headline">
      <div className = "project-headline-leftcol">
      </div>
      <div className = "project-headline-midcol">
        <div className="project-headline-projectName">
          Prosjektnavn: {props.projectName}
        </div>
        <img
        className="project-headline-knapp"
        src={editNamePic}
        alt="Legg til ny boenhet"
        onClick={(event) => props.setShowModal({show:true,modalName:"editNameProject"})}
        />
      </div>
      <div className="project-headline-rightcol">
      </div>
    </div>

  )
}
