export interface ITransition {
    StartTimestamp;
    EndTimestamp;
    StartValue;
    EndValue;



    getValue(t: number);
}
