import { Avatar } from 'antd';
import { SearchItemWrapper } from './SearchItem.style';
const SearchItem = ({user,onClick}) => {

  return (

    <SearchItemWrapper onClick={onClick}>
      <div className="prefix-icon">

      <Avatar size="large" src={user?.avatar?.url} />
      </div>
                <div className="content">
                {user?.username}

                </div>
               
    </SearchItemWrapper>

  )
}

export default SearchItem