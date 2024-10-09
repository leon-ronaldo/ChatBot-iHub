import csv
import json
import os

CURRENT_DIRECTORY = os.getcwd()

print(CURRENT_DIRECTORY)

with open(rf"{CURRENT_DIRECTORY}\ChatBot-iHub\chatbot_server\chatEngine\apple_products.csv", mode="r", encoding="utf-8") as appleCSV, open(rf"{CURRENT_DIRECTORY}\ChatBot-iHub\chatbot_server\chatEngine\formattedData.json", mode="r") as jsonReadFile, open(rf"{CURRENT_DIRECTORY}\ChatBot-iHub\chatbot_server\chatEngine\formattedData.json", mode="w") as jsonWriteFile:
    csv_reader = csv.DictReader(appleCSV)
    try:
        jsonData = json.load(jsonReadFile)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        # Initialize with a default structure if JSON is invalid
        jsonData = {"products": [], "services": {}}
    
    counter = 0
    
    for row in csv_reader:
        if counter == 0:
            counter += 1
            continue
        
        jsonData['products'].append({
            'name': row['Product Name'],
            'url': row['Product URL'],
            'brand': row['Brand'],
            'salePrice': row['Sale Price'],
            'mrp': row['Mrp'],
            'discountPercentage': row['Discount Percentage'],
            'numberOfRatings': row['Number Of Ratings'],
            'numberOfReviews': row['Number Of Reviews'],
            'upc': row['Upc'],
            'starRating': row['Star Rating'],
            'ram': row['Ram'],
        })
        counter += 1
    
    json.dump(jsonData, jsonWriteFile, indent=4)