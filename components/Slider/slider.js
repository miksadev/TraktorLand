import Carousel, { consts } from "react-elastic-carousel";
import Item from "../UI/Slider/item";
import StyledImg from "../UI/Slider/styledimg";
import StyledP from "../UI/Slider/styledp";
import ArrowButton from '../UI/Slider/arrowbutton.js';
import Link from 'next/link'
const slider = ({akcije}) => {
   
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
      ];
      const myArrow = ({ type, onClick, isEdge }) => {
        return (
          <ArrowButton onClick={onClick} disabled={isEdge} tip={type}>
          </ArrowButton>
        )
      }
    return (
        <Carousel 
        breakPoints={breakPoints}  
        renderArrow={myArrow} 
        enableAutoPlay 
        autoPlaySpeed={2000}
        renderPagination={({ pages, activePage, onClick }) => {
          return (
            <div styles="direction:row;display:flex;">
              {pages.map(page => {
                const isActivePage = activePage === page
                return (
                  <div
                    key={page}
                    onClick={() => onClick(page)}
                   
                  />
                )
              })}
            </div>
          )
        }}
        >
      {/* <Link href={item.link_proizvoda}></Link> */}
        {akcije.map(item => <Link key={item.sifra} href={item.link_proizvoda}><Item>
            <StyledImg src={item.thumb}/>
            <StyledP>{item.ime}</StyledP>
          </Item></Link> )}
          
      </Carousel>
    );
}

export default slider;