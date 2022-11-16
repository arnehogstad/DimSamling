import React from 'react'
import delPic from '../../../../images/Slett.jpg'
import editNamePic from '../../../../images/redigerInverted.png'
import lagrePic from '../../../../images/lagreIcon.png'
import openPic from '../../../../images/openFileIcon.png'
import newPic from '../../../../images/nyttProsjekt.png'
import EditIcon from '@mui/icons-material/Edit'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

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
          <NoteAddIcon
          className="project-headline-knapp"
          />
          NYTT
        </div>
        <div
          className="project-headline-knapp-div"
          alt="Legg til ny boenhet"
          onClick={(event) => props.setShowModal({show:true,modalName:"openProject"})}
        >
          <UploadIcon
          className="project-headline-knapp"
          />
          ÅPNE
        </div>
        <div
          className="project-headline-knapp-div"
          alt="Legg til ny boenhet"
          onClick={(event) => props.setShowModal({show:true,modalName:"saveProject"})}
        >
          <DownloadIcon
          className="project-headline-knapp"
          />
          LAST NED
        </div>
        <div
          className="project-headline-knapp-div"
          alt="Legg til ny boenhet"
          onClick={(event) => props.setShowModal({show:true,modalName:"editNameProject"})}
        >
          <EditIcon
          className="project-headline-knapp"
          />
          REDIGER
        </div>
      </div>
    </div>

  )
}
