import { filterListStatus } from '../../constants'

const Footer = ({ leftItemsNum, filter, onFilterChange, clearCompletedVisible ,onClearCompleted }) => {
    return (
        <div className="Footer">
            <div className="left">
                { leftItemsNum } items left
            </div>
            <div className="middle">
                { Object.keys(filterListStatus).map((key) => {
                    return (
                        <div
                            key={key}
                            className={`${ 'filter-item' } ${ filterListStatus[key] === filter ? 'filter-item-actived' : undefined }`}
                            onClick={() => { onFilterChange(filterListStatus[key]) }}
                        >
                            { key }
                        </div>
                    )
                }) }
            </div>
            <div
                className="right"
                onClick={onClearCompleted}
            >
                { 
                    clearCompletedVisible &&
                    <span>Clear completed</span>
                }
            </div>
        </div>
    );
};

export default  Footer;