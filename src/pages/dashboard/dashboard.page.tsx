import React, { useEffect } from "react";
import { useInstance } from "../../hooks/use-instance.hook";
import { CoinsService } from "../../store/service/coins/coins.service";
import { observer } from "mobx-react";
import { Card, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    sub_container: {
        display: 'flex',
        width: '100%', 
        justifyContent: 'space-between'
    },
    card: {
        width: 250, margin: 10, padding: 15
    }
})

const addCommas = (number: number): string => {
    let numberFloor = Math.floor(number)
    let numberStr = numberFloor.toString();
    let numberArray = numberStr.split('').reverse();
    let result: string[] = [];
  
    for (let i = 0; i < numberArray.length; i++) {
      if (i !== 0 && i % 3 === 0) {
        result.push(',');
      }
      result.push(numberArray[i]);
    }
  
    return result.reverse().join('');
}

const Dashboard: React.FC = observer(() => {
    const classes = useStyles();
    const coinsService = useInstance(CoinsService)
    const limArray = coinsService.data.slice(0, 4)

    useEffect(() => {
        coinsService.setCoins()
    })

    return coinsService.isLoading ? 
                <div>
                    <div className={classes.sub_container}>
                        {
                            limArray.map((el:any) => (
                                <Card key={el.rank} className={classes.card}>
                                    <Typography fontSize={20}>{el.name}/{el.symbol}</Typography>
                                    <div>
                                        <p style={{ fontSize: '15px'}}>Currency: {addCommas(el.price)}$</p>
                                        <p style={{ fontSize: '15px'}}>Change: {el.change}%</p>
                                    </div>
                                </Card>
                            ))
                        }
                    </div>
                    <div>Tester Value</div>
                </div>
            : <div>Loading....</div>
});

export default Dashboard