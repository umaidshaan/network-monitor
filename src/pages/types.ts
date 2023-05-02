export interface InputData {
    radacctid: number;
    acctsessionid: string;
    acctuniqueid: string;
    username: string;
    realm: string;
    nasipaddress: string;
    nasportid: string;
    nasporttype: string;
    acctstarttime: string;
    acctupdatetime: string;
    acctstoptime: string;
    acctinterval: string;
    acctsessiontime: number;
    acctauthentic: string;
    connectinfo_start: string;
    connectinfo_stop: string;
    acctinputoctets: number;
    acctoutputoctets: number;
    calledstationid: string;
    callingstationid: string;
    acctterminatecause: string;
    servicetype: string;
    framedprotocol: string;
    framedipaddress: string;
    framedipv6address: string;
    framedipv6prefix: string;
    framedinterfaceid: string;
    delegatedipv6prefix: string;
    class: string;
}

export interface NetworkRecords {
    acctstarttime: string;
    username: string;
    total_octates_used: string;
}

export interface filteredNetworkData {
    students: { [date: string]: { [key: string]: NetworkRecords[] } };
    staff?: { [date: string]: NetworkRecords[] };
} 