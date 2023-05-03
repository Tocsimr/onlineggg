function login()
Variable = {}
Variable["LoginURL"]= "http://tocsiserver.xyz/gg/tocsi-login.php"
Prompt = gg.prompt({"💡Username","💡Password","exit"},nil,{"text","text","checkbox"})
	if not Prompt then
	return
	end
	if Prompt[3] then
	return
	end

Variable["TempLogin"]  = '{"Username":"'..Prompt[1]..'","Password":"'..Prompt[2]..'"}'

ResponseContent = gg.makeRequest(Variable["LoginURL"],nil,Variable["TempLogin"]).content
pcall(load(ResponseContent))
end


function feedback()
Variable = {}
Variable["FeedbackURL"]= "http://tocsiserver.xyz/gg/tocsi-feedback.php" ---- Paste Your Link Feedback.php here
Prompt = gg.prompt({"⚠️Your Name :","⚠️Your Feedback :","exit"},nil,{"text","text","checkbox"})
	if not Prompt then
	return
	end
	if Prompt[3] then
	return
	end

Variable["TempFeedback"]  = '{"Username":"'..Prompt[1]..'","Feedback":"'..Prompt[2]..'"}'

ResponseContent = gg.makeRequest(Variable["FeedbackURL"],nil,Variable["TempFeedback"]).content
pcall(load(ResponseContent))
gg.alert("❗Your Feedback Succes Sended!")
end

MyMenu = {
	{"𝖢𝖱𝖤𝖠𝖳𝖮𝖱 𝖵𝖨𝖦𝖭𝖤𝖲𝖧 ❤️", true}, {
		"➪ 𝖬𝖾𝗆𝖻𝖾𝗋 𝖫𝗈𝗀𝗂𝗇 🙋‍♂️", login,
	    "➪ 𝖲𝖾𝗇𝖽 𝖥𝖾𝖾𝖽𝖻𝖺𝖼𝗄𝗌 🔥", feedback,
		}
}

gg.alert("𝖮𝗇𝗅𝗂𝗇𝖾 𝖲𝖼𝗋𝗂𝗉𝗍 : 𝖢𝗋𝖾𝖺𝗍𝗈𝗋𝖵𝗂𝗀𝗇𝖾𝗌𝗁 ❤️")
function initMenu(Menu, prevMenu)
	local title, menuType, cOpt, _opt = Menu[1][1], Menu[1][2], {{},{}}
	for _ = 1, #Menu[2], 2 do
		name, func = Menu[2][_], Menu[2][_ + 1]
		cOpt[1][#cOpt[1] + 1] = (type(func) == "table" and name.." >" or name)
		cOpt[2][#cOpt[2] + 1] = func
	end
	cOpt[1][#cOpt[1] + 1] = (prevMenu and "< Back to " .. prevMenu[1][1] or "➪ Exit Server 😐")

	while(true) do
		if gg.isVisible() then gg.setVisible(false)
			if menuType then _opt = gg.multiChoice(cOpt[1], nil, title) else _opt = gg.choice(cOpt[1], nil, title) end
			if _opt then
				-- Sorry for messy code for menuType handler.
				if not menuType then
					-- choice Handler
					efunc = cOpt[2][_opt]
					if efunc then
						if type(efunc) ~= "table" then efunc() else gg.setVisible(true) initMenu(efunc, Menu) end
					else
						gg.setVisible(true)
						return
					end
				else
					-- multiChoice Handler  
					for _ = 1, #cOpt[1] do
						if _opt[_] then
							efunc = cOpt[2][_]
							if efunc then
								if type(efunc) ~= "table" then efunc() else gg.setVisible(true) initMenu(efunc, Menu) end
							else
								gg.setVisible(true)
								return
							end
						end
					end
				end
			end
		end
		gg.sleep(300)
	end
end

initMenu(MyMenu)