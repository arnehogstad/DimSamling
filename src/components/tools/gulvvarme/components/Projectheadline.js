import React from 'react'
import delPic from '../../../../images/Slett.jpg'
import editNamePic from '../../../../images/redigerInverted.png'
import lagrePic from '../../../../images/lagreIcon.png'
import openPic from '../../../../images/openFileIcon.png'
import newPic from '../../../../images/nyttProsjekt.png'

export default function Projectheadline(props){



  return(
    <div className = "project-headline">
      <div className = "project-headline-leftcol">
      </div>
      <div className = "project-headline-midcol">
        <div className="project-headline-projectName">
          Prosjektnavn: {props.projectName}
        </div>

      </div>
      <div className="project-headline-rightcol">

        <div
          className="project-headline-knapp-div"
          alt="Legg til ny boenhet"
          onClick={(event) => props.setShowModal({show:true,modalName:"newProject"})}
        >
          <img
          className="project-headline-knapp"
          src={newPic}
          alt="Legg til ny boenhet"
          />
          NYTT
        </div>
        <div
          className="project-headline-knapp-div"
          alt="Legg til ny boenhet"
          onClick={(event) => props.setShowModal({show:true,modalName:"openProject"})}
        >
          <img
          className="project-headline-knapp"
          src={openPic}
          alt="Legg til ny boenhet"
          />
          ÅPNE
        </div>
        <div
          className="project-headline-knapp-div"
          alt="Legg til ny boenhet"
          onClick={(event) => props.setShowModal({show:true,modalName:"saveProject"})}
        >
          <img
          className="project-headline-knapp"
          src={lagrePic}
          alt="Legg til ny boenhet"
          />
          LAGRE
        </div>
        <div
          className="project-headline-knapp-div"
          alt="Legg til ny boenhet"
          onClick={(event) => props.setShowModal({show:true,modalName:"editNameProject"})}
        >
          <img
          className="project-headline-knapp"
          src={editNamePic}
          alt="Legg til ny boenhet"
          />
          REDIGER
        </div>
      </div>
    </div>

  )
}
