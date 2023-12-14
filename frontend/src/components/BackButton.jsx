import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

//{url} can be changed where the component is used
const BackButton = ({ url }) => {
    return (

        <Link to={url} classname='btn btn-reverse btn-back'>
            <FaArrowCircleLeft /> Back
        </Link>
    )
}

export default BackButton
