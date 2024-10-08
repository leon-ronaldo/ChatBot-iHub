import csv
import json
import os

CURRENT_DIRECTORY = os.getcwd()

with open(rf"{CURRENT_DIRECTORY}\..\apple.csv", mode="r", encoding="utf-8") as appleCSV, open(rf"{CURRENT_DIRECTORY}\..\formattedData.json", mode="r") as jsonReadFile, open(rf"{CURRENT_DIRECTORY}\..\formattedData.json", mode="w") as jsonWriteFile:
    csv_reader = csv.DictReader(appleCSV)
    try:
        jsonData = json.load(jsonReadFile)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        # Initialize with a default structure if JSON is invalid
        jsonData = {"products": {}, "services": {}}
    
    counter = 0
    
    for row in csv_reader:
        if counter == 0:
            counter += 1
            continue
        
        jsonData['products'][counter] = {
            'model': row['model'],
            'price': row['price'],
            'country_code': row['country_code'],
            'country': row['country'],
            'region': row['region'],
            'income_group': row['income group'],
            'scraped_date': row['scraped_date'],
        }
        counter += 1
    
    json.dump(jsonData, jsonWriteFile, indent=4)