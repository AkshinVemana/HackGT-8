import csv

# create dict with county to fips codes
fips_dict = {}
with open('state_and_county_fips_master.csv') as fips_codes:
    fips_reader = csv.DictReader(fips_codes)
    for row in fips_reader:
        fips_dict[row['name'].title().replace(" County","")] = row['fips']
        # print(row.name.title())
        # fips_dict[row.name.title()].append(row['fips'])

# create object w/ hospital names & counties
with open('hospital-data.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    f = open('hospital_list.js',"w")
    # f.write("\"Hospital Name\", \"County\"\n")
    f.write("export const hospital_list = [\n")
    for row in reader:
        str = "\t{ hospital: \"" + row['Hospital Name'].title() + "\", county: \"" + row['County'].title()
        #TODO: fix fips code resolve
        if (row['County'].title().replace(" County","") in fips_dict):
            str += "\", fips: \"" + fips_dict[row['County'].title()]
            str += "\" },\n"
            f.write(str)
    f.write("]")
    f.close()