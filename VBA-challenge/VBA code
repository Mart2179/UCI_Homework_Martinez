Sub Stock_Market():

For Each ws In Worksheets

'Assigning variables

 Dim Ticker As String
 Dim Yearly_Change As Double
 Dim Percent_Change As Double
 Dim Total_Stock_Volume As Double
 Total_Stock_Volume = 0
 Dim RowOutput As Long
 RowOutput = 2
 Dim PreviousAmount As Long
 PreviousAmount = 2
 Dim LastRow As Long
 Dim Yearly_Open As Double
 Dim Yearly_Close As Double

 
 
'Last row
LastRow = ws.Cells(Rows.Count, 1).End(xlUp).Row

'Assigning the range for the row

For i = 2 To LastRow

Total_Stock_Volume = Total_Stock_Volume + ws.Cells(i, 7).Value

'If cells contain different values then assign a name from the value that was the most previous
If ws.Cells(i + 1, 1).Value <> ws.Cells(i, 1).Value Then

'Assign that name to Ticker
Ticker = ws.Cells(i, 1).Value

'Place those values in the "I" column
ws.Range("I" & RowOutput).Value = Ticker

'Place the Ticker Total Amount to the correct column
ws.Range("L" & RowOutput).Value = Total_Stock_Volume

'Reset Ticker
Total_Stock_Volume = 0




' Set Yearly Open, Yearly Close and Yearly Change Name
Yearly_Open = ws.Range("C" & PreviousAmount)
Yearly_Close = ws.Range("F" & i)
Yearly_Change = Yearly_Close - Yearly_Open
ws.Range("J" & RowOutput).Value = Yearly_Change



' Determine Percent Change
If Yearly_Open = 0 Then
    Percent_Change = 0
Else
    Yearly_Open = ws.Range("C" & RowOutput)
    Percent_Change = Yearly_Change / Yearly_Open
End If
    ' Change Double so that it includes percentage and two decimal places
    ws.Range("K" & RowOutput).NumberFormat = "0.00%"
    ws.Range("K" & RowOutput).Value = Percent_Change
    
'Conditional Formatting High
If ws.Range("J" & RowOutput).Value >= 0 Then
    ws.Range("J" & RowOutput).Interior.ColorIndex = 4
Else
    ws.Range("J" & RowOutput).Interior.ColorIndex = 3
End If

RowOutput = RowOutput + 1
PreviousAmount = i + 1
End If

Next i



Next ws

End Sub
