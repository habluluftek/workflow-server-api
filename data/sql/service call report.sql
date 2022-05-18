SELECT 
b.id as callId,
b.regDate as entryDate,
b.attnDate as attendedDate,
b.completedDate as completedDate,
c.firstname as salesEngg,
b.projectName,
d.name as customer,
e.name as partName,
f.name as troubleName,
b.complaintDesc,
b.customerRemarks,
b.correction,
g.name as callStatus
FROM luftekin_luftapp.serviceCall_troubles a
INNER JOIN luftekin_luftapp.serviceCall b ON a.serviceCallId = b.id
INNER JOIN luftekin_luftapp.users c ON c.id = b.salesEr
INNER JOIN luftekin_luftapp.customers d ON b.customerId = d.id
INNER JOIN luftekin_luftapp.ahu_parts e ON e.id = a.ahuPart
INNER JOIN luftekin_luftapp.`trouble-list` f ON f.id = a.trouble
INNER JOIN luftekin_luftapp.serviceCall_status g ON g.id = b.status;