import os
import csv

'Set our variable'
monthcount = 0
total_profit = 0
initial_profit = 0
total_change_profit = 0
'Set our lists'
Profit = []
Month_change = []
Average = []
Date = []

'Create our path'
csvpath = os.path.join("..", "Resources", "budget_data.csv")

'Create a file that is readable from our path'
with open(csvpath) as csvfile:

    csv_reader = csv.reader(csvfile, delimiter=',')
    csv_header = next(csv_reader)

    for row in csv_reader:
        'This counts the months'
        monthcount = monthcount + 1
        
        'Append Date list'
        Date.append(row[0])

        'This counts the total profit'
        total_profit = total_profit + int(row[1])

        'This counts the average of changes in the year'
        final_profit = int(row[1])
        change_in_monthly_profits = (final_profit - initial_profit)

        'Store in a list'
        Month_change.append(change_in_monthly_profits)

        'Make the loop use the previous variable'
        total_change_profit = total_change_profit + change_in_monthly_profits
        initial_profit = final_profit

        'Average formula'
        average_change_in_month = (total_change_profit)/(monthcount)
        
        'Greatest de/increase in profits formula'
        greatest_increase = max(Month_change)
        greatest_decrease = min(Month_change)

        'Nest the Date list with the Change in Monthly Profits list'
        greatest_increase_date = Date[Month_change.index(greatest_increase)]
        greatest_decrease_date = Date[Month_change.index(greatest_decrease)]


print('Financial Analysis')
print("----------------------")
print(f'Total Months: {monthcount}')  
print(f'Total Profit: ${total_profit}')
print(f'Average Change Per Month: ${average_change_in_month}')
print(f'Greatest Increase in Profits: {greatest_increase_date} ${greatest_increase}')
print(f'Greatest Decrease in Profits: {greatest_decrease_date} ${greatest_decrease}')