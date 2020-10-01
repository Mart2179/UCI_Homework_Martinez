import os
import csv

'Variables'
total_number_of_votes_cast = 0

"Empty lists"
candidate_list = []
individual_candidate = []
total_votes_per_candidate = []
votes_counted = []
percentage_list = []

csv_path = os.path.join("..", "Resources", "election_data.csv")

with open(csv_path) as csv_file:

    csv_reader = csv.reader(csv_file, delimiter=",")
    csv_header = next(csv_reader)

    for row in csv_reader:

       'Total number of votes cast'
       total_number_of_votes_cast = total_number_of_votes_cast + 1

       'Complete list'
       candidate_list.append(row[2])
       "this will organize the list so there are no repeating names"
    for candidate in set(candidate_list):
        
        'This is extract the individual names of the newly organized list'
        individual_candidate.append(candidate)

        'total number of votes per candidate '
        total_votes_per_candidate = candidate_list.count(candidate)
        votes_counted.append(total_votes_per_candidate)

        'Percentage formula'
        percentage = (total_votes_per_candidate/total_number_of_votes_cast)*100
        percentage_list.append(percentage)

winning_vote_count = max(votes_counted)
winner = individual_candidate[votes_counted.index(winning_vote_count)]

        

print("Election Results")
print("-------------------")
print(f"Total Votes: {total_number_of_votes_cast}")
print("-----------------------")
for i in range(len(individual_candidate)):
        print(f'{individual_candidate[i]} ": "{percentage_list[i]}"% ("{votes_counted[i]}")"')

print("--------------------")
print("The winner is: " + winner)
print("-----------------------")