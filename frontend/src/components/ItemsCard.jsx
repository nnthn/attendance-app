import "./itemscard.css";
export default function ItemsCard(props){
    return (
        <div className="items-card">
          <h4 className="items-name">{props.subject}</h4>
          <h4 className="item-unit">{props.mark}</h4>
        </div>
    );
}
