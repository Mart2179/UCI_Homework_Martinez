import os
import csv

'Set our variable'
monthcount = 0
total_profit = 0
first_month = 0
last_month = 1

'Set our lists'
Profit = []
Month_change = []
Average = []

'Create our path'
csvpath = os.path.join("..", "Resources", "budget_data.csv")

'Create a file that is readable from our path'
with open(csvpath) as csvfile:

    csv_reader = csv.reader(csvfile, delimiter=',')
    csv_header = next(csv_reader)

    for row in csv_reader:
        'This counts the months'
        monthcount = monthcount + 1
        
        'This counts the total profit'
        total_profit = total_profit + int(row[1])

        'This counts the average of changes in the year'
        last_month = (int(row[1])+ 1)
        first_month = int(row[1])
        change_in_month = (last_month - first_month)/first_month
        average_change_in_month = change_in_month/monthcount


print('Financial Analysis')
print("----------------------")
print (f'Total Months: {monthcount}')  
print (f'Total Profit: ${total_profit}')
print (f'Average Change Per Month: ${average_change_in_month}')